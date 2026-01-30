import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Movie,
  ResponsePagination,
  ResponsePaginationByName,
} from './interfaces/movie/movie.interface';
import { MovieDto } from './dto/movie.dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie')private movieModel: Model<Movie>
  ) {
  }

  async addMovie(movieDto: MovieDto): Promise<any> {
    const movie = new this.movieModel(movieDto);
    return movie.save();
  }

  async getMovies(): Promise<Movie[]> {
    const movies =
      await this.movieModel.find().exec();
    return movies;
  }

  async getMoviesPaginated(
    page: number,
    limit: number,
  ): Promise<ResponsePagination> {
    const skip = (page -1 ) * limit;
    const movies =
      await this.movieModel.find()
        .skip(skip)
        .limit(limit)
        .exec();

    const total =
      await this.movieModel.find().countDocuments();
    return {
      data: movies,
      info:{
        totalMovies: total,
        totalPages: Math.ceil(total / limit),
        page,
        limit
      }
    };
  }

  async getMovie(id: string): Promise<Movie> {
    const movie =
      await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException({
        status: false,
        message: 'Movie not found',
      });
    }
    return movie;
  }

  async getMovieByName(name: string): Promise<Movie[]> {
    const regex = new RegExp(name, 'i');
    return this.movieModel.find(
      { title: regex }
    ).exec();
  }

  async getMovieByNamePaginated(
    name: string,
    page: number,
    limit: number
  ): Promise<ResponsePaginationByName> {
    const skip = (page -1 ) * limit;
    const regex = new RegExp(name, 'i');
    const data = 
      await this.movieModel.find(
      { title: regex }
    )
      .skip(skip)
      .limit(limit)
      .exec();
    
    const total = 
      await this.movieModel.find({ title: regex }).countDocuments();
    
    return {
      data,
      searchedWord: name,
      info:{
        totalMovies: total,
        totalPages: Math.ceil(total / limit),
        page,
        limit
      }
    }
    
    
  }

  async putMovie(id: string, movieDto: MovieDto): Promise<any> {
    const updatedMovie =
      await this.movieModel.findByIdAndUpdate(
        id,
        movieDto,
        { new: true },
      ).exec();
    if (!updatedMovie) {
      throw new NotFoundException({
        status: false,
        message: 'Movie not found',
      })
    }
    return updatedMovie;
  }

  async patchMovie(id: string, partialMovieDto: Partial<MovieDto>): Promise<any> {
    const updatedMovie =
      this.movieModel.findByIdAndUpdate(
      id,
        {$set: partialMovieDto},
        { new: true },
    ).exec();
    if (!updatedMovie) {
      throw new NotFoundException({
        status: false,
        message: 'Movie not found',
      })
    }
    return updatedMovie;
  }

  async deleteMovie(id: string): Promise<any> {
    const deletedMovie =
      await this.movieModel.findByIdAndDelete(id).exec();
    if (!deletedMovie) {
      throw new NotFoundException({
        status: false,
        message: 'Movie not found',
      })
    }
    return deletedMovie;
  }

  async getGenres(): Promise<string[]>{
    return this.movieModel.find().distinct('genres').exec();
  }
}
