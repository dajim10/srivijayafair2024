import React from 'react'

const Register = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm mx-auto">
                    <div className="card p-3" style={{ background: 'rgba(255,255,255,0.5)', borderStyle: 'none', backdropFilter: 'blur(5px)', boxShadow: '0 0 4px #000', borderRadius: '20px' }}>
                        <label htmlFor="phone">เบอร์โทร</label>
                        <input type="text" className="form-control" id="phone" />
                        <label htmlFor="">คุณคือ?</label>
                        <select className="form-control" name="" id="persontype">
                            <option value="">นักศึกษา</option>
                            <option value="">บุคลากร</option>
                            <option value="">บุคคลทั่วไป</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register