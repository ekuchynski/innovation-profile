import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react'

export default function EditorHtml(props)
{
   const editorRef = useRef()
   const [editorLoaded, setEditorLoaded] = useState(false)
   const { CKEditor, ClassicEditor } = editorRef.current || {}

   useEffect(() =>
   {
      editorRef.current = {
         CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
         ClassicEditor: require('ckeditor5-custom-build/build/ckeditor')
      }
      setEditorLoaded(true)
   }, []);

   return (
      <Row>
         <Col span={24} style={{ width: '90vw' }}>
            {editorLoaded && <CKEditor
               editor={ClassicEditor}
               data={props.value ? props.value : ''}
               onChange={(event, editor) =>
               {
                  const data = editor.getData()
                  props.onChange(data);
               }}
            />}
         </Col>
      </Row>);
}