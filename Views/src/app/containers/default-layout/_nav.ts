import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Etudiant',
    url: '/etudiants',
  },
  {
    name: 'Filiere',
    url: '/filieres',
  },
  
];
