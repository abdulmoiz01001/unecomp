"use client"
import React, { ReactNode, useRef } from 'react'
// import { store } from '@/lib/store/store'
import { makeStore, AppStore } from '@/lib/store/store'
import { Provider } from 'react-redux'
import { addSearch } from '@/lib/store/features/search/searchSlice'

const StoreProvider = ({children} : { children : ReactNode }) => {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
      // storeRef.current.dispatch(addSearch("abdulmoiz"))
    }
  return <Provider store={storeRef.current} >{children}</Provider>
}

export default StoreProvider