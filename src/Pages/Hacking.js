import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards/Cards'
import IntroPage from '../components/IntroPage/IntroPage'
import ErrorPage from '../components/OtherCom/ErrorPage'
import Loading from '../components/OtherCom/Loading'

const Hacking = ({ darkMode }) => {
  const [hacking, setHacking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
         // eslint-disable-next-line
        const res = await axios.get('https://networkwizards.tech/wp-json/wp/v2/hacking/'  + '?t=' + new Date().getTime())
        setHacking(res.data)
      } catch (err) {
        setError(err)
      }
        setLoading(false)
    }
    fetchData()
  }, [])
  if (loading) {
    return <Loading loading={loading} darkMode={darkMode}  />
  }
  if (error) {
    return <ErrorPage error={error} />
  }
  return (
    <div className={`ContentPage ${darkMode ? "dark" : "light"}`}>
      <IntroPage darkMode={darkMode} typingEffect={false} PageName={"Hacking"} />
      <div className="CardSection">
        {hacking ? hacking.map(card => (
          <div key={card.id}>
            {/* <p dangerouslySetInnerHTML={{ __html: card.content.rendered }} />  -> API send the text with some html this will remove those element  */}
            <Cards key={card.id} darkMode={darkMode} title={card.title.rendered} content={<p dangerouslySetInnerHTML={{ __html: card.excerpt.rendered }} />} />
          </div>
        )) : ""}
      </div>
    </div>
  )
}

export default Hacking