const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

export const isValidUUID = (uuid: string) => { 
  regexExp.lastIndex = 0;
  return regexExp.test(uuid)
}
