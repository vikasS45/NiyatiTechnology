import React, { useReducer, createContext } from 'react';

const initialState = {
  videos: {},
}

const videoReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_VIDEO_LISTING': 
      return  {
        ...state,
        videos: action.payload
      }
    default: 
      return state;
  }
}

const VideoContext = createContext(initialState)

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState)
  return (
    <VideoProvider.Provider value={{videoState: state, videoDispatch: dispatch}}>
      {children}
    </VideoProvider.Provider>
  )
}
export {VideoContext, VideoProvider}