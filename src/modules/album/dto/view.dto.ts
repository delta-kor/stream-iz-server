import { IsString } from 'class-validator';

export default class ViewDto {
  @IsString({ message: 'no uuid' })
  uuid!: string;
}
