type DtoHelper<P> = { [key in keyof P]: P[key] };
export default DtoHelper;
