import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export { HealButton as default };

async function healMakerProtocol(debt) {
  try {
    console.log(debt);
    const provider = window.vow.provider;
    await window.ethereum.enable()
    const signer = provider.getSigner();
    const vowWrite = window.vow.connect(signer);
    const tx = await vowWrite.heal(debt);
    await provider.waitForTransaction(tx.hash);
  } catch (error) {
    console.error(error)
  }
}

function HealButton(props) {
  const [ isHealing, setHealing ] = useState(false);
  const [ healAmount, setHealAmount ] = useState('');

  useEffect(() => {
    if (isHealing) {
      healMakerProtocol(healAmount).then(() => {
        setHealing(false);
      });
    }
  }, [isHealing, healAmount]);

  const handleClick = () => {
    setHealAmount(props.sysDebtRaw);
    setHealing(true);
  }

  return (
    <Button
      variant="outline-success"
      disabled={isHealing}
      onClick={!isHealing ? handleClick : null}
      size="lg"
      block
    >
      {isHealing ? 'Healing…' : 'Heal'}
    </Button>
  );
}
