import React, { useEffect, useState } from "react";
import { ContainerGrid, FooterGrid, HeaderGrid, LoadingWrapper, Root } from "./styled";
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import useLocalStorage from "../../hooks/useLocalStorage";

interface BankRate {
  slug: string;
  name_ru: string;
  name_uk: string;
  cash: {
    date: string;
    bid: string;
    ask: string;
  } | null;
  card: {
    date: string;
    bid: string;
    ask: string;
  } | null;
}

interface StorageBankRate {
  currencyData: {
    date: string;
  currency: string;
  rates: BankRate[]
  }[]
}

interface Props {
  currency: string;
}

const mostPopularBanks = [{ slug: "monobank", order: 1}, { slug: "privatbank", order: 2}, { slug: "pumb", order: 3}, { slug: "sensebank", order: 4}, { slug: "ukrsibbank", order: 5}, { slug: "universal-bank", order: 6}, { slug: "oschadbank", order: 7}, { slug: "otp-bank", order: 8}, { slug: "a-bank", order: 9}, { slug: "kredobank", order: 10}, { slug: "mtbbank", order: 11}];

const CurrencyRate = ({ currency }: Props) => {
    const CURRENCY_API_URL = import.meta.env.VITE_CURRENCY_API_URL;

    const [loading, setLoading] = useState(false);
    const [currencyRateStorage, setCurrencyRateStorage] = useLocalStorage<StorageBankRate>("currencyRateStorage", { currencyData: [{ date: "", currency: "", rates: [] }] });

  useEffect(() => {
    const currencyData = currencyRateStorage.currencyData.find(data => data.currency === currency);
    const isActualData = currencyData && dayjs().diff(dayjs(currencyData.date), "hour") < 2;
    if (!currencyData || !isActualData) {
      getCurrencyRates();
    }
  }, [currency]);

  const getCurrencyRates = async () => {
    setLoading(true);
    const response = await axios.get(`${CURRENCY_API_URL}/${currency}`);
    if (!response.data?.data) return;
    setCurrencyRateStorage({
      currencyData: [...currencyRateStorage.currencyData.filter(data => data.currency !== currency && data.currency), { date: new Date().toISOString(), currency, rates: response.data?.data }]
    });
    setLoading(false);
  };

  const getAverageRate = () => {
    const currentCurrencyEntry = currencyRateStorage.currencyData.find(data => data.currency === currency);
    const rates = currentCurrencyEntry?.rates.filter(bankRate => bankRate.card !== null && bankRate.card.ask !== "0");

    if (!rates || rates.length === 0) {
      return 0;
    }

    const sumOfAsks = rates.reduce((sum, bankRate) => {
      const askPrice = Number(bankRate.card?.ask);
      return sum + (isNaN(askPrice) ? 0 : askPrice); 
    }, 0);

    return (sumOfAsks / rates.length).toFixed(2);
  };

  return (
    <Root>
      {currencyRateStorage.currencyData.find(data => data.currency === currency)?.rates && !loading && (<ContainerGrid container>
        <HeaderGrid size={6}>
          <Typography fontSize={16} fontWeight={600}>Bank name</Typography>
        </HeaderGrid>
        <HeaderGrid size={6} sx={{ paddingLeft: "15px"}}>
          <Typography fontSize={16} fontWeight={600}>Bank rate {currency}</Typography>
        </HeaderGrid>
        {currencyRateStorage.currencyData.find(data => data.currency === currency)?.rates
          .sort((a, b) => (mostPopularBanks.find(bank => bank.slug === a.slug)?.order ?? 12) - (mostPopularBanks.find(bank => bank.slug === b.slug)?.order ?? 12))
          .filter((bank) => bank.card !== null && bank.card.ask !== "0")
          .map((bank) => (
            <React.Fragment key={bank.slug}>
              <Grid size={6} sx={theme => ({ borderRight: `1px solid ${theme.palette.primary.main}`})}>
                <Typography fontSize={16} fontWeight={500}>{bank.name_uk}</Typography>
              </Grid>
              <Grid size={6} sx={{ paddingLeft: "15px"}}>
                <Typography fontSize={16} fontWeight={500}>{bank.card?.ask}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        <FooterGrid size={6}>
          <Typography fontSize={16} fontWeight={600}>Average rate</Typography>
        </FooterGrid>
        <FooterGrid size={6} sx={{ paddingLeft: "15px"}}>
          <Typography fontSize={16} fontWeight={600}>{getAverageRate()}</Typography>
        </FooterGrid>
      </ContainerGrid>)}
      {loading && (
        <LoadingWrapper>
          <CircularProgress color="inherit" />
        </LoadingWrapper>
      )}
    </Root>
  );
};

export default CurrencyRate;
