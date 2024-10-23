

export const getRestaurants = async (cuisine: string, latitude: number, longitude: number) => {
  const response = await fetch(`https://ieukj2n5awjjslzsf5bpgrfnli0ldqng.lambda-url.ap-south-1.on.aws/?latitude=${latitude}&longitude=${longitude}&cuisine=${cuisine}`);
  const data = await response.json();
  return data;
};
