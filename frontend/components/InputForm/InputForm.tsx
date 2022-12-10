// FIXME: 下のルールを有効にできるようにする
// 時給入力の「円」を child として渡しているとこで出ている
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/Recoil";
import {
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { inputFormData } from "../../store/dummyData";

type EnteredInfoType = {
  company: string;
  year: number;
  internType: number;
  period: number;
  jobType: number;
  salary: number;
  internContents: string;
  evaluation: number; //1-5
  developEx: number; // 入力は必須ではないため、未入力のときは -1 を送る
  internEx: number; // 入力は必須ではないため、未入力のときは -1 を送る
  internTestPreparation: string;
  isSelectionExemption: number; // 0 or 1
  selectionExemptionContents: string;
  impressions: string;
  userId: string;
};

// TODO: 入力周りの refactor する
// TODO: render が多すぎて performance が低い

type Props = {
  isEdit: boolean;
};

const settingDefaultValue = (isEdit: boolean, uid: string) => {
  // FIXME: ルー化の有効化
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const loginStatus = useRecoilValue(loginState);

  // isEdit === true の場合、API から取得してきたデータを初期値とする
  if (isEdit === false) {
    return {
      company: "",
      year: -1,
      internType: -1,
      period: -1,
      jobType: -1,
      salary: -1,
      internContents: "",
      evaluation: -1, //1-5
      developEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
      internEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
      internTestPreparation: "",
      isSelectionExemption: -1, // 0 or 1
      selectionExemptionContents: "",
      impressions: "",
      userId: uid,
    };
  } else {
    return {
      company: "#####",
      year: 1,
      internType: 1,
      period: 1,
      jobType: 1,
      salary: 1,
      internContents: "#####",
      evaluation: 1, //1-5
      developEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
      internEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
      internTestPreparation: "##########",
      isSelectionExemption: 1, // 0 or 1
      selectionExemptionContents: "",
      impressions: "#########",
      userId: uid,
    };
  }
};
export const InputForm = ({ isEdit }: Props) => {
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);
  const loginStatus = useRecoilValue(loginState);
  const [enteredInfo, setEnteredInfo] = useState<EnteredInfoType>(() => {
    return settingDefaultValue(isEdit, loginStatus.uid);
  });
  const [radioButtonValue, setValue] = useState<string>(() => {
    if (isEdit === false) {
      return "";
    } else {
      return enteredInfo.isSelectionExemption === -1
        ? ""
        : (enteredInfo.isSelectionExemption as unknown as string); // FIXME: 型の修正
    }
  });

  // style 用の変数の定義
  const WLarge = "85%";
  const WSmall = "15%";
  const spaceBetweenItems = 4;
  const spaceBetweenTitle = 16;

  // ラジオボタンの変更の検出
  useEffect(() => {
    let newData = { ...enteredInfo };
    newData.isSelectionExemption = radioButtonValue as unknown as number; //FIXME: 型の修正
    setEnteredInfo(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioButtonValue]);

  // 必須項目がすべて選択されているかの判定
  useEffect(() => {
    console.log(enteredInfo);
    if (
      enteredInfo.company !== "" &&
      enteredInfo.year !== -1 &&
      enteredInfo.internType !== -1 &&
      enteredInfo.period !== -1 &&
      enteredInfo.jobType !== -1 &&
      enteredInfo.salary !== -1 &&
      enteredInfo.internContents !== "" &&
      enteredInfo.evaluation != -1 &&
      enteredInfo.impressions !== ""
    ) {
      setIsSearchDisable(false);
    } else {
      setIsSearchDisable(true);
    }
  }, [enteredInfo]);

  return (
    <>
      <Text fontSize="2xl">インターン情報について教えて下さい</Text>
      <Text fontSize="md">※は必須項目です</Text>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>企業名※</Text>
        <Input
          w={WLarge}
          placeholder="企業名"
          defaultValue={enteredInfo.company}
          onChange={(event) => {
            let newData = { ...enteredInfo };
            newData.company = event.target.value;
            setEnteredInfo(newData);
          }}
        />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>参加年度※</Text>
        <Select
          w={WLarge}
          placeholder="年"
          defaultValue={
            enteredInfo.year === -1
              ? ""
              : (enteredInfo.year as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.year = -1;
            } else {
              newData.year = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.year.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターン種別※</Text>
        <Select
          w={WLarge}
          placeholder="インターン種別"
          defaultValue={
            enteredInfo.internType === -1
              ? ""
              : (enteredInfo.internType as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.internType = -1;
            } else {
              newData.internType = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.internType.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>期間※</Text>
        <Select
          w={WLarge}
          placeholder="期間"
          defaultValue={
            enteredInfo.period === -1
              ? ""
              : (enteredInfo.period as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.period = -1;
            } else {
              newData.period = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.period.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>職種※</Text>
        <Select
          w={WLarge}
          placeholder="職種"
          defaultValue={
            enteredInfo.jobType === -1
              ? ""
              : (enteredInfo.jobType as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.jobType = -1;
            } else {
              newData.jobType = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.jobType.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>報酬(時給換算)※</Text>
        <HStack w={WLarge}>
          <InputGroup size="md">
            <Input
              type="number"
              placeholder="時給"
              defaultValue={enteredInfo.salary !== -1 ? enteredInfo.salary : ""}
              onChange={(event) => {
                let newData = { ...enteredInfo };
                newData.salary = event.target.value as unknown as number; //FIXME: 型の修正
                setEnteredInfo(newData);
              }}
            />
            <InputRightAddon children="円" />
          </InputGroup>
        </HStack>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターンの内容※</Text>
        <Textarea
          w={WLarge}
          size="lg"
          placeholder="インターン内容"
          defaultValue={enteredInfo.internContents}
          onChange={(event) => {
            let newData = { ...enteredInfo };
            newData.internContents = event.target.value;
            setEnteredInfo(newData);
          }}
        />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>総合評価※</Text>
        <Select
          w={WLarge}
          placeholder="総合評価"
          defaultValue={
            enteredInfo.evaluation === -1
              ? ""
              : (enteredInfo.evaluation as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.evaluation = -1;
            } else {
              newData.evaluation = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.evaluation.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">インターン選考時の状況について教えてください</Text>

      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"30%"}>選考時の趣味開発やハッカソン等での開発経験</Text>
        <Select
          w={"70%"}
          placeholder="開発経験"
          defaultValue={
            enteredInfo.developEx === -1
              ? ""
              : (enteredInfo.developEx as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.developEx = -1;
            } else {
              newData.developEx = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.developEx.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"30%"}>選考時のインターンへの参加経験</Text>
        <Select
          w={"70%"}
          placeholder="インターンへの参加経験"
          defaultValue={
            enteredInfo.internEx === -1
              ? ""
              : (enteredInfo.internEx as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.internEx = -1;
            } else {
              newData.internEx = event.target.value as unknown as number; //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormData.internEx.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンの選考対策として行ったことがあれば教えてください</Text>
      <VSpacer size={spaceBetweenItems} />
      <Textarea
        size="lg"
        placeholder="内容"
        defaultValue={enteredInfo.internTestPreparation}
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.internTestPreparation = event.target.value;
          setEnteredInfo(newData);
        }}
      />
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンに参加したことでその先の選考の免除があったか</Text>
      <VSpacer size={spaceBetweenItems} />

      <RadioGroup onChange={setValue} value={`${radioButtonValue}`}>
        <HStack>
          <Radio value="1">あり</Radio>
          <Radio value="0">なし</Radio>
        </HStack>
      </RadioGroup>
      <VSpacer size={spaceBetweenItems} />
      <Textarea
        size="lg"
        placeholder="免除となった内容"
        defaultValue={enteredInfo.selectionExemptionContents}
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.selectionExemptionContents = event.target.value;
          setEnteredInfo(newData);
        }}
      />

      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">最後に</Text>
      <VSpacer size={spaceBetweenItems} />
      <Text>全体の感想(参加して良かったことや改善点など)※</Text>
      <VSpacer size={spaceBetweenItems} />
      <Textarea
        size="lg"
        placeholder="感想"
        defaultValue={enteredInfo.impressions}
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.impressions = event.target.value;
          setEnteredInfo(newData);
        }}
      />

      <VSpacer size={spaceBetweenItems} />
      <Center>
        <Button colorScheme="blue" isDisabled={isSearchDisable}>
          送信
        </Button>
      </Center>
    </>
  );
};