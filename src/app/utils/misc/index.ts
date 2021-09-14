export async function filterFalsyValuesFromObject(obj: any): Promise<any> {
  const newObj: any = {};
  for (const key in obj) {
    if (obj[key] !== null || obj[key] !== undefined || obj[key] !== '') {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
