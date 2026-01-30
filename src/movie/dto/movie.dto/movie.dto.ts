import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImdbDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  votes: number;
}
export class MovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  plot: string;

  @IsString()
  @IsNotEmpty()
  poster: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ValidateNested()
  @Type(() => ImdbDto)
  @IsNotEmpty()
  imdb: ImdbDto;
}

