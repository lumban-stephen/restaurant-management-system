import { useState } from "react";
import { Button } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Wallet = () =>{

    const [money, setMoney] = useState(0);
    const [input, setInput] = useState(0);

    const withdraw =() => {
        if(money >= input)
        setMoney(money - input)
    }

    const deposit =() => {
        setMoney(money + input)
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return(
        <div>
            <div>
                <p>You currently have PHP {money} from your total earnings</p>
                <p>Enter reason for action:</p>
                <input type="number" class="form-control" name="moneyInput" value={input} onChange={handleChange}/>
                <Button variant="secondary" onClick={ withdraw }>
                    Withdraw
                </Button>
                <Button variant="secondary" onClick={ deposit }>
                    Deposit
                </Button>
            </div>
        </div>
    );
}

export default Wallet;
