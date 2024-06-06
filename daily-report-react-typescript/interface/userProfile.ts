export interface UserData{
    id:number,
    name: string | "";
    display_name:string;
    profile_picture: string | "";
    password: string | "";
}
export interface UserProfile {
    user: UserData;
    getUserData: ()=>void;
  }

  export interface EditUserProfile{
    name: string | "";
    display_name:string;
    profile_picture: string | "";
    password: string | "";
    old_password: string | "";
    password_confirmation: string | "";

}