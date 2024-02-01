export const isSubmitBtnDisabled = (name: string, email: string, description: string) => {
  return !name || !email || !description;
}