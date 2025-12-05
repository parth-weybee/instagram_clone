
export const dateFormatter = (d)=>
{
    let dateObj = new Date(d);
      const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
