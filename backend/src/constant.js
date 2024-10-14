export const DB_NAME= "Note-App"

export const options = {
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'None'
}