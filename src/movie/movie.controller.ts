import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto/movie.dto';
import { PaginationDto } from '../pagination/paginationDto';

@Controller('api/v2/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('')
  async addMovie(@Body() movieDto: MovieDto) {
    try {
      await this.movieService.addMovie(movieDto);
      return {
        status: true,
        message: 'Movie added successfully',
      };
    } catch (error) {
      throw new BadRequestException({
        status: false,
        message: error.message,
      });
    }
  }

  @Get('')
  async getMovies() {
    try {
      const data = await this.movieService.getMovies();
      return {
        status: true,
        movies: data,
      };
    } catch (error) {
      throw new BadRequestException({
        status: false,
        message: error.message,
      });
    }
  }

  @Get('paginated')
  async getMoviesPaginated(
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const page = paginationDto.page || 1;
      const limit = paginationDto.limit || 10;

      const data =
        await this.movieService.getMoviesPaginated(
          page,
          limit,
        );
      return {
        status: true,
        ...data
      };
    } catch (error) {
      throw new BadRequestException({
        status: false,
        message: error.message,
      });
    }
  }

  @Get('movie/:id')
  async getMovie(@Param('id') id: string) {
    try {
      const data = await this.movieService.getMovie(id);
      return {
        status: true,
        movie: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        {
          status: false,
          message: error.message,
        }
      )
    }
  }

  @Get('genres')
  async getGenres(){
    try {
      const data = await this.movieService.getGenres();
      return {
        status: true,
        genres: data,
      }
    }catch (error) {
      throw new BadRequestException({
        status: false,
        message: error.message,
      })
    }
  }

  // /api/v2/movies/byName?name=XXX
  @Get('byName')
  async getByName(@Query('name') name: string,) {
    try {
      const movies = await
        this.movieService.getMovieByName(name);
      return {
        status: true,
        movies
      }
    }catch (e) {
      throw new BadRequestException({
        status: false,
        message: e
      })
    }
  }

  @Get('byNamePaginated')
  async getByNamePaginated(
    @Query('name') name: string,
    @Query() paginationDto: PaginationDto,
    ) {
    try {
      const page = paginationDto.page || 1;
      const limit = paginationDto.limit || 10;

      const data = await
        this.movieService.getMovieByNamePaginated(
          name,
          page,
          limit,
          );

      return {
        status: true,
        ...data
      }
    }catch (e) {
      throw new BadRequestException({
        status: false,
        message: e
      })
    }
  }

  @Put('update/:id')
  async putMovie(@Param('id') id: string,
                 @Body() movieDto: MovieDto) {
    try {
      await this.movieService.putMovie(id, movieDto);
      return {
        status: true,
        message: 'Movie updated successfully',
      }
    }catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        {
          status: false,
          message: e.message,
        }
      )
    }
  }

  @Patch('update/:id')
  async patchMovie(@Param('id') id: string,
                 @Body() partialMovieDto: Partial<MovieDto>) {
    try {
      await this.movieService.patchMovie(id, partialMovieDto);
      return {
        status: true,
        message: 'Movie partially updated successfully',
      }
    }catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        {
          status: false,
          message: e.message,
        }
      )
    }
  }

  @Delete('delete/:id')
  async deleteMovie(@Param('id') id: string) {
    try {
      await this.movieService.deleteMovie(id);
      return {
        status: true,
        message: 'Movie deleted successfully',
      }
    }catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        {
          status: false,
          message: e.message,
        }
      )
    }
  }
}
