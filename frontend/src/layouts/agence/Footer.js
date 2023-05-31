import React from 'react';
import {Link} from 'react-router-dom';




const Footer = () => {
    return(
        <footer className="py-2 bg-light ">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; RentIn 2023</div>
                             <div className="text-muted">
                                Owners
                                &middot;
                                Mouad Houari &amp; Adnane Benaida  
                            </div> 
                        </div>
                    </div>
                </footer>

    );
}

export default Footer ;
