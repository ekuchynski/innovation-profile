import React from 'react'
import { Checkbox } from 'antd';

export default function EditorCheckbox(props)
{
   return (
      <Checkbox
         checked={props.value}
         onChange={(e) =>
         {
            props.onChange(e.target.checked);
         }}
      />
   );
}