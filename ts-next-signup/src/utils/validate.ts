const validate = {
  isRequired: (value: string) => value !== '',

  isEmailForm: (value: string) =>
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
      value,
    ),

  isEmailNotDuplicate: async (value: string) => {
    return await new Promise<boolean>((resolve, reject) => {
      const duplicateEmail = 'duplicate@email.com';
      const duplicated = duplicateEmail !== value;
      setTimeout(() => {
        resolve(duplicated);
      }, 1000);
    });
  },

  isPhoneForm: (value: string) =>
    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value),
};

export { validate };
