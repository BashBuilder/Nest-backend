import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString({ message: 'Title is required' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title must be less than 255 characters' })
  title!: string;

  @IsString({ message: 'Description is required' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'Location is required' })
  @IsNotEmpty({ message: 'Location is required' })
  @MaxLength(255, { message: 'Location must be less than 255 characters' })
  location!: string;

  @IsString({ message: 'Capacity is required' })
  @IsNotEmpty({ message: 'Capacity is required' })
  @MaxLength(255, { message: 'Capacity must be less than 255 characters' })
  capacity!: string;

  @IsInt({ message: 'Price is required' })
  @Min(0, { message: 'Price must be greater than 0' })
  @Max(10000, { message: 'Price must be less than 10000' })
  price!: string;

  @IsString({ message: 'Date is required' })
  @IsNotEmpty({ message: 'Date is required' })
  date!: string;
}
