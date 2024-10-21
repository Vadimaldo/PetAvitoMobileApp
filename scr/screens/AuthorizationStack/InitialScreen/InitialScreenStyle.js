import {COLORS} from "../../../constants/COLORS";

export const style = {
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white
  },
  logo_image: {
    width: 142,
    height: 32,
    resizeMode: 'cover',
    marginBottom: 195
  },
  screen_title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    marginBottom: 24
  },
  screen_title_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginBottom: 184
  },
  bottom: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: COLORS.mainPink,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40
  },
  bottom_text: {
    color: COLORS.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  }
}
