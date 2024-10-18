// assets
import { ChromeOutlined, QuestionOutlined, CloudUploadOutlined, EyeOutlined } from '@ant-design/icons';

const icons = {
  ChromeOutlined,
  QuestionOutlined,
  CloudUploadOutlined,
  EyeOutlined
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
      icon: icons.CloudUploadOutlined
    },
    {
      id: 'view-data',
      title: 'View Data',
      type: 'item',
      url: '/view-data',
      icon: icons.EyeOutlined
    },

    {
      id: 'generated-reports',
      title: 'Generated-Data',
      type: 'item',
      url: '/generated-reports',
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
