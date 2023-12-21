import React from 'react'

const Department = ({ item }) => {
    return (
        <div className="row">


            <div className="row">
                <p className='text-center '>หลักสูตร</p>


                {typeof item.expand.program === 'object' ?
                    item.expand.program.map((item, index) => (
                        <div className="col-4 mt-2" style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <div key={index}
                                onClick={() => {

                                    handleShow(`${imageUrl}${item.collectionId}/${item.id}/${item.image}`)
                                    setYoutubeUrl(item.youtubeLink)
                                }
                                }
                            >

                                {/* <p className='text-center  '>หลักสูตร</p> */}

                                <img src={`${imageUrl}${item.collectionId}/${item.id}/${item.image}`} alt="" className='text-center  rounded' />
                            </div>
                        </div>
                    ))
                    : null
                }


            </div>

        </div >
    )
}

export default Department