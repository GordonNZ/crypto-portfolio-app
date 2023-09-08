import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import './Switch.css';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  theme: string;
};

const SwitchComp = ({ checked, onCheckedChange, theme }: Props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className='Label' htmlFor='light-mode' style={{ padding: 10 }}>
        {theme} Mode
      </label>
      <Switch.Root
        className='SwitchRoot'
        id='light-mode'
        defaultChecked={true}
        onCheckedChange={() => onCheckedChange(!checked)}
      >
        <Switch.Thumb className='SwitchThumb' />
      </Switch.Root>
    </div>
  );
};

export default SwitchComp;
