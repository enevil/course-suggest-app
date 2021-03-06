import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Error from 'next/error';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import { firstLevelMenuData } from '../../helpers/menu';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { withLayout } from '../../layout/MainLayout/MainLayout';
import { TypePage } from '../../page-componenets/TypePage/TypePage';

const Type = ({ firstCategory, menu }: TypeProps) => {
  if (menu === undefined || firstCategory === undefined) return <Error statusCode={404} />;
  return <TypePage firstCategory={firstCategory} menu={menu} />;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenuData.map((m) => `/${m.route}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenuData.find((m) => m.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem._id,
  });
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem._id,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}
