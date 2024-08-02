"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth";

import Header from "../components/Header";
import Days from "../components/Days";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import useDate from "../hooks/useDate";
import useMenu from "../hooks/useMenu";
import useModal from "../hooks/useModal";
import Login from "../login/page";

const Calendar: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  const {
    currentDate,
    setCurrentDate,
    selectedDate,
    handleDateChange,
    view,
    setView,
  } = useDate();
  const { menuOpen, toggleMenu, friendListOpen, toggleFriendList, menuRef } =
    useMenu();
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className="calendar-container bg-white  shadow rounded-lg overflow-hidden relative">
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        view={view}
        setView={setView}
        toggleMenu={toggleMenu}
      />
      <Days currentDate={currentDate} />
      <Menu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        openModal={openModal}
        friendListOpen={friendListOpen}
        toggleFriendList={toggleFriendList}
        menuRef={menuRef}
      />
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
    </div>
  );
};

export default Calendar;
