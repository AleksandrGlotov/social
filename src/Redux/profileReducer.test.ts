import { PostType, ProfileType } from '../types/types';
import profileReducer, { actions } from './profileReducer';

let state = {
    posts: [
        {id: 1, likeCount: 5, text: "Hello", date: '28-06-2021'},
        {id: 2, likeCount: 0, text: "How are you?", date: '28-06-2021'},
        {id: 3, likeCount: 666, text: "Welcome to Hell!!!", date: '28-06-2021'},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

test('length of post should be incremented', () => {
    //1. test data
    let action = actions.addPost('Wow, amazing test, Johny!', '01')

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(4);;
});

test('text of new post should be correct', () => {
    //1. test data
    let action = actions.addPost('Wow, amazing test, Johny!', '01')

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts[3].text).toBe('Wow, amazing test, Johny!');
});

test('after deleting length of posts should be decrement', () => {
    //1. test data
    let action = actions.deletePost(1)

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(2);
});

test('after deleting length of posts shouldn`t be decrement if id is incorrect', () => {
    //1. test data
    let action = actions.deletePost(1000)

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(3);
});

