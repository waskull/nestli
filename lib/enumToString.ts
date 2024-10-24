const EnumToString = (_enum: Record<string, any>) =>
    Object.keys(_enum)
      .map((key):any => _enum[key])
      .filter(value => typeof value === 'string') as string[];

export default EnumToString;