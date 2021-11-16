import moment from 'moment';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { Circle, Ellipse, Path, Polygon } from 'react-native-svg';
import { useRecoilValue } from 'recoil';

import Icon from '@src/components/Icon';
import Text from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import { SBDOneRM } from '@src/operations/queries/getOneRM';
import { SBDOneRMState } from '@src/recoils';
import { User } from '@src/types/graphql';

import {
  Body,
  Container,
  ContentContainer,
  ContentSvg,
  Date,
  DateContainer,
  Header,
} from '../styled';

const useFirstItem = (
  loginItem: React.ReactElement<ViewProps, 'View'>,
  user?: User,
): React.ReactElement<LinearGradientProps, 'LinearGradient'> => {
  const { colors } = useTheme();
  const { squat, benchPress, deadlift } =
    useRecoilValue<SBDOneRM>(SBDOneRMState);
  const total = squat + benchPress + deadlift;

  return (
    <Container
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.primary, colors.secondary]}>
      <Header>
        <View>
          <Text weight="bold" color="white">
            나의 3대 측정
          </Text>
          <DateContainer>
            <Icon name="calendar-today" color="white" size={16} />
            <Date size={12} color="white">
              {moment().format('YY`M.DD')}
            </Date>
          </DateContainer>
        </View>

        {!!user && (
          <Text size={28} color="white" weight="bold" italic={true}>
            {total}
            <Text size={22} color="white" weight="bold" italic={true}>
              kg
            </Text>
          </Text>
        )}
      </Header>

      {user ? (
        <Body>
          <ContentContainer>
            <ContentSvg width={90} height={90} viewBox="0 0 135 135">
              <Ellipse
                fill="#ffffff"
                cx="67.26"
                cy="23.01"
                rx="13.1"
                ry="14.1"
              />
              <Path
                fill="#ffffff"
                d="M-0.24,31.07h7V22.6l7.1-0.59v-5.04h7.05v13.92h6.03v-2.26h14.12v2.45h9.14c0,0-0.08,2.01,2.95,5.04H20.91
		v14.1h-7.05v-4.53H6.31v-9.07h-6.55V31.07z"
              />
              <Path
                fill="#ffffff"
                d="M134.76,31.07h-7V22.6l-7.1-0.59v-5.04h-7.05v13.92h-6.03v-2.26H93.45v2.45h-9.14c0,0,0.08,2.01-2.95,5.04
		h32.24v14.1h7.05v-4.53h7.56v-9.07h6.55V31.07z"
              />
              <Path
                fill="#ffffff"
                d="M25.95,40.14h9.07c0,0,0,5.04,1.01,5.04c0,0,17.94-5.04,22.07-5.04h9.16v49.4l-16.12,6.01l2.01,30.22H36.03
		v-4.53l6.55-2.01v-2.01L34.52,89c0,0,13.1-11.07,18.64-12.59L45.6,54.75c0,0-8.06,4.03-18.13,4.03
		C27.46,58.78,25.95,53.74,25.95,40.14z"
              />
              <Path
                fill="#ffffff"
                d="M108.56,40.14H99.5c0,0,0,5.04-1.01,5.04c0,0-17.94-5.04-22.07-5.04h-9.16v49.4l16.12,6.01l-2.01,30.22h17.13
		v-4.53l-6.55-2.01v-2.01L100,89c0,0-13.1-11.07-18.64-12.59l7.56-21.67c0,0,8.06,4.03,18.13,4.03
		C107.05,58.78,108.56,53.74,108.56,40.14z"
              />
            </ContentSvg>

            <Text color="white" weight="bold" italic={true}>
              {squat}kg
            </Text>
          </ContentContainer>

          <ContentContainer>
            <ContentSvg width={90} height={90} viewBox="0 0 135 135">
              <Circle fill="#ffffff" cx="92.15" cy="27.24" r="6.5" />
              <Path
                fill="#ffffff"
                d="M91.99,6.52c-11.81,0-21.39,9.28-21.39,20.72s9.57,20.72,21.39,20.72s21.39-9.28,21.39-20.72
		S103.8,6.52,91.99,6.52z M91.99,35.93c-4.8,0-8.69-3.89-8.69-8.69s3.89-8.69,8.69-8.69c4.8,0,8.69,3.89,8.69,8.69
		S96.78,35.93,91.99,35.93z"
              />
              <Path
                fill="#ffffff"
                d="M-0.24,117.47c0,0,0,9.36,9.36,10.69c0,0,6.68,0,8.02-6.68c0,0,2.67-30.74,8.02-30.74h12.03h6.68
		c0,0,4.01,2.67,6.68,2.67c0,0,6.68,1.34,9.36-1.34c0,0,8.02,0,13.37-1.34c0,0,6.68,2.67,16.04,2.67c0,0,12.03-1.34,13.37-6.68V78.7
		c0,0-1.34-5.35-4.01-5.35h-1.24V49.3c0,0-5.71,2.67-12.93,0v18.04H65.92c0,0-17.38,1.34-18.71,6.68c0,0-16.04-5.35-30.74,0
		c0,0-9.36,4.01-10.69,10.69C5.77,84.72,0.43,90.06-0.24,117.47z"
              />
              <Circle fill="#ffffff" cx="120.05" cy="77.37" r="14.7" />
              <Path
                fill="#ffffff"
                d="M125.4,29.25v96.62h-11.05v-17.78H42.53v18.74H30.46V97.42c0,0,0.71-3.34,4.72-2h78.86V51.3l-2.67-5.35
		c0,0,0-2.67,4.01-2.67l1.34,2.67h4.01V29.25H125.4z"
              />
            </ContentSvg>
            <Text color="white" weight="bold" italic={true}>
              {benchPress}kg
            </Text>
          </ContentContainer>

          <ContentContainer>
            <ContentSvg width={90} height={90} viewBox="0 0 135 135">
              <Ellipse
                fill="#ffffff"
                cx="67.75"
                cy="14.03"
                rx="13.7"
                ry="14.18"
              />
              <Polygon
                fill="#ffffff"
                points="49.16,91.8 65.79,91.8 64.81,134.84 47.64,134.84 47.64,129.95 55.52,127.5 	"
              />
              <Polygon
                fill="#ffffff"
                points="85.79,91.8 69.16,91.8 70.14,134.84 87.31,134.84 87.31,129.95 79.44,127.5 	"
              />
              <Path
                fill="#ffffff"
                d="M47.2,31.15c-8.8,0.98-10.76,9.78-10.76,9.78l-4.89,39.13l-3.75-0.25v1.23h-6.03v-13.7h-7.83v4.89l-6.97,0.38
		v8.43H0.25v6.36h6.36v8.8h6.85v4.89h7.83V87.4h6.36v1.47h11.74l0.01-1.96h29.34V31.15H47.2z M49.65,80.55H39.43l9.24-33.26
		l4.89,21.52C53.56,68.81,49.65,73.7,49.65,80.55z"
              />
              <Path
                fill="#ffffff"
                d="M65.79,31.15v55.76h29.34l0.01,1.96h11.74V87.4h6.36v13.7h7.83V96.2h6.85v-8.8h6.36v-6.36h-6.73v-8.43
		l-6.97-0.38v-4.89h-7.83v13.7h-6.03v-1.23l-3.75,0.25l-4.89-39.13c0,0-1.96-8.8-10.76-9.78H65.79z M80.95,68.81l4.89-21.52
		l9.24,33.26H84.87C84.87,73.7,80.95,68.81,80.95,68.81z"
              />
            </ContentSvg>
            <Text color="white" weight="bold" italic={true}>
              {deadlift}kg
            </Text>
          </ContentContainer>
        </Body>
      ) : (
        loginItem
      )}
    </Container>
  );
};

export default useFirstItem;
