import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useState } from 'react';

interface AddManagerModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    username: string,
    fullname: string,
    email: string,
    password: string
  ) => void;
}

export default function AddManagerModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddManagerModalProps) {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetState = () => {
    setUsername('');
    setFullname('');
    setEmail('');
    setPassword('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(username, fullname, email, password);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Người Quản Lý'
    >
      <TextField
        name='username'
        label='Tên người dùng'
        placeholder='Nhập tên người dùng'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={username === '' ? 'Không để trống tên người dùng' : ''}
        fullWidth
      />

      <TextField
        name='fullname'
        label='Tên đầy đủ'
        placeholder='Nhập tên đầy đủ của người dùng'
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        error={fullname === '' ? 'Không để trống tên đầy đủ' : ''}
        fullWidth
      />

      <TextField
        name='email'
        label='Email'
        placeholder='Nhập email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={email === '' ? 'Không để trống email' : ''}
        fullWidth
      />

      <TextField
        name='password'
        label='Mật khẩu'
        placeholder='Nhập mật khẩu'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={password === '' ? 'Không để trống mật khẩu' : ''}
        fullWidth
      />
    </Modal>
  );
}
