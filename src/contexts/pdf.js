import React, { useReducer, createContext } from 'react';

const initialState = {
  pdfs: {},
}
const pdfReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_PDF_LISTING': 
      return  {
        ...state,
        pdfs: action.payload
      }
    default: 
      return state;
  }
}

const PDFContext = createContext(initialState)

const PdfProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pdfReducer, initialState)
  return (
    <PdfProvider.Provider value={{pdfState: state, pdfDispatch: dispatch}}>
      {children}
    </PdfProvider.Provider>
  )
}

export {PDFContext, PdfProvider}


