
export const getFieldRequiredRules = (message: string) => {
    return [
        {
            required: true,
            message
        }
    ]
}