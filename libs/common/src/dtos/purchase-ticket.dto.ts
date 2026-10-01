import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class PurchaseTicketDto {
  @IsUUID('4', { message: 'Event ID is invalid' })
  @IsNotEmpty({ message: 'Event ID is required' })
  eventId!: string;

  @IsInt({ message: 'Quantity is required' })
  @IsNotEmpty({ message: 'Quantity is required' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @Min(10, { message: 'Quantity must be at most 10' })
  quantity!: number;
}
