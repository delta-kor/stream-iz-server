import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { Lyrics } from '../music.interface';

export default class UploadDto {
  @IsString({ message: 'no key' })
  public key!: string;

  @IsString({ message: 'no title' })
  public title!: string;

  @IsString({ message: 'no album id' })
  public album_id!: string;

  @IsString({ message: 'no genie id' })
  public genie_id!: string;

  @IsString({ message: 'no youtube id' })
  public yt_id!: string;

  @IsBoolean({ message: 'no title option' })
  public isTitle!: boolean;

  @IsObject({ message: 'no lyrics' })
  public lyrics!: Lyrics;

  @IsNumber({}, { message: 'no length' })
  public length!: number;
}
