import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards/Cards'
import IntroPage from '../components/IntroPage/IntroPage'
import ErrorPage from '../components/OtherCom/ErrorPage'
import Loading from '../components/OtherCom/Loading'

const Coding = ({ darkMode, search }) => {
  const [coding, setCoding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // eslint-disable-next-line
        const res = await axios.get(`http://itspersonalwebsite.live//wp-json/wp/v2/coding?search=${search}&t=${new Date().getTime()}`);

        setCoding(res.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [search])
  if (loading) {
    return <Loading loading={loading} darkMode={darkMode} />
  }
  if (error) {
    return <ErrorPage error={error} />
  }
  // console.log(coding)
  return (
    <div className={`ContentPage ${darkMode ? "dark" : "light"}`}>
      <IntroPage darkMode={darkMode} typingEffect={false} PageName={"Coding"} />
      <div className="CardSection">
        {coding ? coding.map(card => (
          <div key={card.id}>
            {/* <p dangerouslySetInnerHTML={{ __html: card.content.rendered }} />  -> API send the text with some html this will remove those element  */}
            <Cards key={card.id} darkMode={darkMode} title={card.title.rendered} content={<p dangerouslySetInnerHTML={{ __html: card.excerpt.rendered }} />} />
          </div>
        )) : ""}
      </div>
    </div >
  )
}

export default Coding