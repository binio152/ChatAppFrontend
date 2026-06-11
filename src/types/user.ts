export interface User {
    _id: string,
    username: string,
    email: string,
    displayName: string,
    avatarUrl?: string,
    bio?: string,
    phone?: string,
    created_at?: string,
    updated_at?: string
}