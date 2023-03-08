import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    readonly price: number;
}