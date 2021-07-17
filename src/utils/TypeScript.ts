import { ChangeEvent, FormEvent } from 'react'
import { TriggerConfig } from 'react-hook-form'
import rootReducer from '../redux/reducers/index'

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>

export interface IUserLogin {
  username?: string 
  password?: string 
} 

export interface IUserRegister extends IUserLogin {
    email?: string 
  username?: string 
  password?: string 
}

export interface IUser extends IUserLogin {
  _id?: number 
  username?: string 
  firstname?: string 
  avatar?: string 
  lastname?: string 
  job?: string 
  email?: string 
  address?: string 
  schoolName?: string 
  major?: string 
  bio?: string 
  createdAt?: Date
  updatedAt?: Date 
  favourTimeFrom?: Date
  favourTimeTo?: Date
}

  export interface errorsApiRes  {
    status? : number | null
    message? : string | null 
    errors? : IErrors
  }

  export interface IErrors {
    email? : string,
    username? : string,
    password?: string
    bio?: string
    title?:string
    description?:string
    name?:string
  }


  export interface IAlert {
    loading?: boolean
    success?: string | string[]
    errors?: errorsApiRes 
  }

  export interface ISet {
    title? :string
    limit?: number
    desc?: string
    tag?: string
    isPublic?: boolean
  }

  export interface ICard {
    index?: number
    id?:number
    front: string
    back: string
  }

  export interface ICardLearning {
    userId?:number
    cardId?:number
    studySetId?:number
    front:string
    back:string
    hint?:string
    color?:string
  }

  export interface IStudySetInfo {
    _id?:number
    title?: string
    description?: string
    tag?:string 
    creatorName?:string
    isPublic?:false
    numberCard?: number
  }
  
  export interface IEvent {
    id?: number
    username?:string
    description?:string
    fromTime?:Date
    toTime?: Date
    color?:string
    createDate?:Date
    updateDate?:Date
  }
 
  export interface IEventRe {
    startDate:Date
    endDate:Date
    title?: string
    notes?:string
    id:number
    color?:string
  }

  export interface IFolder {
    folder_id: number;
    title: string;
    description: string;
    color: string;
    numberOfSets: number;
    createdDate: string;
    creatorUserName: string;
  };

  export interface INewFolder {
 
    title: string;
    color: string;
    description: string;
    creator_id: string;
  };
  
  export interface IRoom {
    room_id: number;
    name: string;
    numberOfMembers: number;
    createdDate: string;
  };
  
  export interface INewRoom {
   
    name: string;
    description: string;
    owner_id: string;
  };
  
  

  export interface IStudySet{
    studySet_id:number
    title: string
    description: string
    tags:string 
    numberOfCards:number
    creatorName:string
    color:string
    
  }
  