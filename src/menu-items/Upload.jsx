// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const Upload = {
  id: 'upload',
  title: 'Operations',
  type: 'group',
  children: [
    {
      id: 'upload-file',
      title: 'Upload Files',
      type: 'item',
      url: '/upload-file',
      icon: icons.ChromeOutlined
    },
    {
      id: 'view-data',
      title: 'View Data',
      type: 'item',
      url: '/view-data',
      icon: icons.ChromeOutlined
    }
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: '/documentation',
    //   icon: icons.QuestionOutlined,
    //   external: true,
    //   target: true
    // }
  ]
};

export default Upload;
