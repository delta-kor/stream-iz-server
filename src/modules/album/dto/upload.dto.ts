import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export default class UploadDto {
  @IsString({ message: 'no key' })
  public key!: string;

  @IsString({ message: 'no title' })
  public title!: string;

  @IsArray({ message: 'no label' })
  public label!: string[];

  @IsNumber({}, { message: 'no release' })
  public release!: number;

  @IsBoolean({ message: 'no korean option' })
  public isKorean!: boolean;

  @IsBoolean({ message: 'no single option' })
  public isSingle!: boolean;
}
