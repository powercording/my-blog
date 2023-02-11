import ReactQuill from 'react-quill';
import React, { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';

interface EditorValue {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Post({ value, setValue }: EditorValue) {
  const quillRef = useRef<ReactQuill>(null);

  const imgHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');

    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();

      if (file) {
        formData.append('multipartFiles', file[0]);
      }

      if (quillRef.current) {
        const quilEditor = quillRef.current.getEditor();
        const index = quilEditor.getSelection()?.index;

        if (index) {
          quilEditor.setSelection(index, 1);
          quilEditor.clipboard.dangerouslyPasteHTML(
            index,
            `<img src="https://img.danawa.com/prod_img/500000/681/359/img/18359681_1.jpg?shrink=330:330&_v=20221123125717" alt="fasdfafa" />`,
          );
        }
      }
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'strike', 'code', { color: [] }],
          [{ header: [1, 2, 3, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }],
          ['link', 'image'],
        ],
        handlers: {
          image: imgHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    [],
  );

  const format = [
    'header',
    'bold',
    'italic',
    'strike',
    'code',
    'color',
    'ordered',
    'bullet',
    'image',
    'indent',
    'list',
  ];

  return (
    <ReactQuill
      className="h-3/4 w-full xl:w-5/6 2xl:w-2/3 "
      ref={quillRef}
      value={value}
      onChange={setValue}
      modules={modules}
      formats={format}
    />
  );
}
