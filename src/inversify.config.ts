import { Container } from "inversify";
import PostRepository from "./Adapters/Repositories/Post/PostRepository";
import IPostRepository from "./ApplicationServices/interfaces/Repository/IPostRepository.interface";
import IPostService from "./ApplicationServices/Services/Posts/IPostService";
import PostService from "./ApplicationServices/Services/Posts/PostService";
import IUserService from "./ApplicationServices/Services/User/IUserService";
import UserService from "./ApplicationServices/Services/User/UserService";
import "reflect-metadata";
import { TYPES } from "./types";

const injector = new Container();

injector.bind<IUserService>(TYPES.IUserService).to(UserService);

injector.bind<IPostService>(TYPES.IPostService).to(PostService);
injector.bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);

export {injector};

