import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@app/common';
import { DatabaseService } from '@app/database';
import { JwtService } from '@nestjs/jwt';
import { users } from '@app/database/schema/users.js';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    //connect to kafka when the module initializes
    await this.kafkaClient.connect();
  }

  async register(registerDto: RegisterDto) {
    // check if user already exists in the database
    console.log(
      'Checking if user already exists in the database..., registerDto: ',
      registerDto,
    );
    const [existingUser] = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, registerDto.email))
      .limit(1);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // create user
    const [user] = await this.dbService.db
      .insert(users)
      .values({
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
      })
      .returning();

    // send user registered event
    this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
      userId: user.id,
      email: user.email,
      name: user.name,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  async login(loginDto: LoginDto) {
    const [user] = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, loginDto.email))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    console.log('userId in login: ', user.id);

    this.kafkaClient.emit(KAFKA_TOPICS.USER_LOGIN, {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Login successful',
      token,
    };
  }

  async getProfile(userId: string) {
    const [user] = await this.dbService.db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      success: true,
      message: 'Profile fetched successfully',
      userId: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
