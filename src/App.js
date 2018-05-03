import React, {Component} from 'react';
import ButtonPage from './ButtonPage';
import CardPage from './CardPage';
import CheckboxPage from './CheckboxPage';
import DialogPage from './DialogPage';
import DrawerPage from './DrawerPage';
import ElevationPage from './ElevationPage';
import FabPage from './FabPage';
import IconTogglePage from './IconTogglePage';
import ImageListPage from './ImageListPage';
import LinearProgressPage from './LinearProgressIndicatorPage';
import ListPage from './ListPage';
import SelectPage from './SelectPage';
import SliderPage from './SliderPage';
import TextFieldPage from './TextFieldPage';
import HeaderBar from './HeaderBar';
import TopAppBarPage from './TopAppBarPage';
import TopAppBarFramePage from './frame/TopAppBarFramePage';
import TypographyPage from './TypographyPage';
import {MDCRipple} from '@material/ripple';
import {imagePath} from './constants';

import './styles/App.scss';
import DrawerFramePage from './frame/DrawerFramePage';

const pageExt = process.env.MDC_NO_JEKYLL ? '.html' : '';

const componentUrlToPageMap = {
  '/button': <ButtonPage />,
  '/card': <CardPage />,
  '/checkbox': <CheckboxPage />,
  '/dialog': <DialogPage />,
  '/drawer': <DrawerPage />,
  '/drawer/temporary': <DrawerFramePage type='temporary' />,
  '/drawer/permanent': <DrawerFramePage type='permanent' />,
  '/drawer/persistent': <DrawerFramePage type='persistent' />,
  '/drawer/permanentBelowTopAppBar': <DrawerFramePage type='permanentBelowTopAppBar' />,
  '/elevation': <ElevationPage />,
  '/fab': <FabPage />,
  '/icon-toggle': <IconTogglePage />,
  '/image-list': <ImageListPage />,
  '/linear-progress-indicator': <LinearProgressPage />,
  '/list': <ListPage />,
  '/select': <SelectPage />,
  '/slider': <SliderPage />,
  '/text-field': <TextFieldPage />,
  '/top-app-bar': <TopAppBarPage />,
  '/top-app-bar/dense': <TopAppBarFramePage type='dense'/>,
  '/top-app-bar/fixed': <TopAppBarFramePage type='fixed'/>,
  '/top-app-bar/prominent': <TopAppBarFramePage type='prominent'/>,
  '/top-app-bar/short': <TopAppBarFramePage type='short'/>,
  '/top-app-bar/short-collapsed': <TopAppBarFramePage type='shortCollapsed'/>,
  '/top-app-bar/standard': <TopAppBarFramePage type='standard'/>,
  '/typography': <TypographyPage />,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.ripples = [];
    this.initRipple = el => this.ripples.push(new MDCRipple(el));
  }

  componentWillUnmount() {
    this.ripples.forEach(ripple => ripple.destroy());
  }

  renderListItem(title, imageSource, url) {
    const fullUrl = `${process.env.PUBLIC_URL}/${url}${pageExt}`;
    return (
      <li className='catalog-image-list-item mdc-image-list__item'>
        <a href={fullUrl}>
          <div className='catalog-image-list-item-container mdc-image-list__image-aspect-container mdc-ripple-surface'
               ref={this.initRipple}>
            <img className='mdc-image-list__image' src={imageSource} alt={`${title} icon`}/>
          </div>
        </a>
        <div className='mdc-image-list__supporting'>
          <a href={fullUrl} className='catalog-image-list-label mdc-image-list__label'>{title}</a>
        </div>
      </li>
    );
  }

  render() {
    const {PUBLIC_URL, NODE_ENV} = process.env;
    const componentUrl = NODE_ENV === 'production' ?
      window.location.pathname.split(PUBLIC_URL)[1] :
      window.location.pathname;
    const componentPage = componentUrlToPageMap[componentUrl.slice(0, componentUrl.length - pageExt.length)];
    if (componentPage) {
      return componentPage;
    }
    return (
      <div>
        <HeaderBar isTopPage />
        <ul id='catalog-image-list' className='mdc-image-list standard-image-list mdc-top-app-bar--fixed-adjust'>
          {this.renderListItem('Button', `${imagePath}/buttons_180px.svg`, 'button')}
          {this.renderListItem('Card', `${imagePath}/cards_180px.svg`, 'card')}
          {this.renderListItem('Checkbox', `${imagePath}/checkbox_180px.svg`, 'checkbox')}
          {this.renderListItem('Dialog', `${imagePath}/dialog_180px.svg`, 'dialog')}
          {this.renderListItem('Drawer', `${imagePath}/drawer_180px.svg`, 'drawer')}
          {this.renderListItem('Elevation', `${imagePath}/elevation_180px.svg`, 'elevation')}
          {this.renderListItem('Fab', `${imagePath}/floating_action_button_180px.svg`, 'fab')}
          {this.renderListItem('Icon Toggle', `${imagePath}/icon_toggle_180px.svg`, 'icon-toggle')}
          {this.renderListItem('Image List', `${imagePath}/image_list_180px.svg`, 'image-list')}
          {this.renderListItem('Linear Progress', `${imagePath}/linear_progress_180px.svg`, 'linear-progress-indicator')}
          {this.renderListItem('List', `${imagePath}/list_180px.svg`, 'list')}
          {this.renderListItem('Select', `${imagePath}/form_field_180px.svg`, 'select')}
          {this.renderListItem('Slider', `${imagePath}/slider_180px.svg`, 'slider')}
          {this.renderListItem('Text Field', `${imagePath}/form_field_180px.svg`, 'text-field')}
          {this.renderListItem('Top App Bar', `${imagePath}/top_app_bar_180px.svg`, 'top-app-bar')}
        </ul>
        <ul className='mdc-image-list standard-image-list mdc-top-app-bar--fixed-adjust'>
          {this.renderListItem('Typography', `${imagePath}/fonts_180px.svg`, 'typography')}
        </ul>
      </div>
    );
  }
}

export default App;
