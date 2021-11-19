import React, { useCallback, useState } from 'react'
import Editor from './editor'
import Preview from './preview'
//import TopBar from './top-bar'
import './app.css'

const App: React.FC = () => {
  const [doc, setDoc] = useState<string>('# New File\n')

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc)
  }, [])
  return (
    <div className='app'>
      <Editor onChange={handleDocChange} initialDoc={doc}/>
      <Preview doc={doc} />
    </div>
  )
}

export default App
