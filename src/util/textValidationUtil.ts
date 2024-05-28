interface validationRule {
    name: string,
    func: (password: string) => boolean,
}

interface validatedRule {
    name: string,
    valid: boolean,
}

const passwordValidationRules: validationRule[] = [
 {
    name: "Must be atleast 6 characters in length",
    func: (password: string) => {return password.length >= 6}
 }, {
    name: "Must have capital first letter",
    func: (password: string) => {
        return password.at(0)!.toUpperCase() == password!.at(0);
    }
 }
]

export const validatePassword = (password: string) => {
    const validation: validatedRule[] = [];
    passwordValidationRules.forEach((rule) => {
        validation.push({
            name: rule.name,
            valid: rule.func(password)
        })
    })
    return validation;
}