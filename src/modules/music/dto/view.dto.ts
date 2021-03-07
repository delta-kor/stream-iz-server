import { IsString } from 'class-validator';

export default class ViewDto {
  @IsString({ message: 'no uuid' })
  public uuid!: string;
}
