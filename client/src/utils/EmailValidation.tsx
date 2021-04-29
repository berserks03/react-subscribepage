export const validateEmail = (email: string) => {
  const re = /^(\w|\.|_|-)+[@](\w|_|-|\.)+[.]\w{2,3}$/;
  return re.test(String(email));
};

export const fromColombia = (email: string) => {
  const re = /\.co$/gi;
  return re.test(String(email));
};

export const getProvider = (email: string) => {
  const re = /@\S+\./gi;
  const provider = email.match(re)?.toString().toLowerCase();
  if (provider) {
    return provider
      .replace(provider.charAt(provider.length - 1), '')
      .replace(provider.charAt(0), '');
  }
  return 'invalid';
};
